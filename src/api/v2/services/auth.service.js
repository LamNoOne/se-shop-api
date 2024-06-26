"use strict"
require("dotenv").config()
const bcrypt = require("bcrypt")
const {
    app: { saltRounds, protocol, host, port, secretKeyAdmin },
} = require("~/config/environment.config")
const ApiError = require("~/core/api.error")
const { StatusCodes, ReasonPhrases } = require("http-status-codes")
const cartService = require("~/api/v2/services/cart.service")
const userService = require("~/api/v2/services/user.service")
const tokenService = require("~/api/v2/services/token.service")
const refreshTokenUsedService = require("~/api/v2/services/refresh.token.used.sevice")
const resetTokenService = require("~/api/v2/services/reset.token.service")
const wishListService = require("~/api/v2/services/wish.list.service")
const roleRepo = require("~/api/v2/repositories/role.repo")
const userRepo = require("~/api/v2/repositories/user.repo")
const userStatusRepo = require("~/api/v2/repositories/user.status.repo")
const resetTokenRepo = require("~/api/v2/repositories/reset.token.repo")
const sendMail = require("~/api/v2/utils/send.mail")
const {
    createTokenPair,
    verifyToken,
    createResetToken,
} = require("~/api/v2/utils/auth.util")
const { v4: uuidv4 } = require("uuid");

const oauth = async (oauthTokenId) => {
    // 1. Fetch to google api to get user information
    const oauthCredentials = await getOauthCredentials(oauthTokenId)
    const { sub, email, email_verified, given_name, family_name, picture } =
        oauthCredentials
    // 2. Check email is verified
    if (!email_verified) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Email is not verified")
    }
    // 3. Check if subId is exist in database
    const user = await userRepo.getUserByOauthId(sub)
    // 4. If subId is exist, return user and token pair
    if (user) {
        const { accessToken, refreshToken } = createTokenPair({
            payload: { userId: user.id, username: user.username },
            privateKey: user.privateKey,
        })
        const token = await tokenService.createToken({
            accessToken,
            refreshToken,
            userId: user.id,
        })

        return {
            user: {
                id: user.id,
                lastName: user.lastName,
                firstName: user.firstName,
                username: user.username,
                image: user.imageUrl,
                phoneNumber: user.phoneNumber,
                email: user.email,
                address: user.address,
            },
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
        }
    }

    // 5. If subId is not exist, create new user and return user and token pair

    try {
        const customerRole = await roleRepo.getRoleByName("customer")
        if (!customerRole)
            throw new ApiError(
                StatusCodes.INTERNAL_SERVER_ERROR,
                ReasonPhrases.INTERNAL_SERVER_ERROR
            )
        const activeStatus = await userStatusRepo.getUserStatusByName("active")
        if (!activeStatus)
            throw new ApiError(
                StatusCodes.INTERNAL_SERVER_ERROR,
                ReasonPhrases.INTERNAL_SERVER_ERROR
            )

        const newUser = await userService.createUserOauth({
            oauthId: sub,
            roleId: customerRole.id,
            genderId: 1,
            userStatusId: activeStatus.id,
            lastName: family_name,
            firstName: given_name,
            imageUrl: picture,
            phoneNumber: null,
            email: email,
            address: null,
            username: email,
            password: uuidv4(),
        })
        await cartService.createCart({ userId: newUser.id })
        await wishListService.createWishList(newUser.id)

        const { accessToken, refreshToken } = createTokenPair({
            payload: { userId: newUser.id, username: newUser.username },
            privateKey: newUser.privateKey,
        })

        const token = await tokenService.createToken({
            accessToken,
            refreshToken,
            userId: newUser.id,
        })

        return {
            user: {
                id: newUser.id,
                lastName: newUser.lastName,
                firstName: newUser.firstName,
                username: newUser.username,
                image: newUser.imageUrl,
                phoneNumber: newUser.phoneNumber,
                email: newUser.email,
                address: newUser.address,
            },
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
        }
    } catch (error) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Login with Oauth failed")
    }
}

const getOauthCredentials = async (oauthTokenId) => {
    try {
        const response = await fetch(
            `${process.env.GOOGLE_API_TOKEN_ID}?id_token=${oauthTokenId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error:", error)
        throw error
    }
}

const signUp = async ({
    genderId,
    lastName,
    firstName,
    phoneNumber,
    email,
    address,
    username,
    password,
}) => {
    const customerRole = await roleRepo.getRoleByName("customer")
    if (!customerRole)
        throw new ApiError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            ReasonPhrases.INTERNAL_SERVER_ERROR
        )
    const activeStatus = await userStatusRepo.getUserStatusByName("active")
    if (!activeStatus)
        throw new ApiError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            ReasonPhrases.INTERNAL_SERVER_ERROR
        )

    try {
        const newUser = await userService.createUser({
            roleId: customerRole.id,
            genderId: genderId,
            userStatusId: activeStatus.id,
            lastName,
            firstName,
            phoneNumber,
            email,
            address,
            username,
            password,
        })
        await cartService.createCart({ userId: newUser.id })
        await wishListService.createWishList(newUser.id)
    } catch (error) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Sign up failed")
    }
}

const signUpAdmin = async ({
    genderId,
    lastName,
    firstName,
    phoneNumber,
    email,
    address,
    username,
    password,
    secretKey,
}) => {
    const isMatchSecretKey = secretKey === secretKeyAdmin
    if (!isMatchSecretKey)
        throw new ApiError(StatusCodes.BAD_REQUEST, "Secret key is wrong")

    const adminRole = await roleRepo.getRoleByName("admin")
    if (!adminRole)
        throw new ApiError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            ReasonPhrases.INTERNAL_SERVER_ERROR
        )
    const activeStatus = await userStatusRepo.getUserStatusByName("active")
    if (!activeStatus)
        throw new ApiError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            ReasonPhrases.INTERNAL_SERVER_ERROR
        )

    return await userService.createUser({
        roleId: adminRole.id,
        genderId: genderId,
        userStatusId: activeStatus.id,
        lastName,
        firstName,
        phoneNumber,
        email,
        address,
        username,
        password,
    })
}

const signIn = async ({ username, password }) => {
    const foundUser = await userRepo.getUserByUsername(username)
    if (!foundUser)
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            "Username or password is wrong"
        )

    const isMatchPassoword = await bcrypt.compare(password, foundUser.password)
    if (!isMatchPassoword)
        throw new ApiError(
            StatusCodes.UNAUTHORIZED,
            "Username or password is wrong"
        )

    // check user status
    const foundUserStatus = await userStatusRepo.getUserStatusById(
        foundUser.userStatusId
    )
    if (!foundUserStatus)
        throw new ApiError(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN)
    if (foundUserStatus.name.toLowerCase() !== "active") {
        throw new ApiError(StatusCodes.FORBIDDEN, "Account has been disabled")
    }

    const { accessToken, refreshToken } = createTokenPair({
        payload: { userId: foundUser.id, username: foundUser.username },
        privateKey: foundUser.privateKey,
    })
    const token = await tokenService.createToken({
        accessToken,
        refreshToken,
        userId: foundUser.id,
    })

    return {
        user: {
            id: foundUser.id,
            lastName: foundUser.lastName,
            firstName: foundUser.firstName,
            username: foundUser.username,
            image: foundUser.imageUrl,
            phoneNumber: foundUser.phoneNumber,
            email: foundUser.email,
            address: foundUser.address,
        },
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
    }
}

const refreshToken = async ({ userId, refreshToken }) => {
    // automatically detect illegally stolen refresh token
    const foundRefreshTokenUsed =
        await refreshTokenUsedService.getRefreshTokenUsed({ refreshToken })
    if (foundRefreshTokenUsed) {
        await tokenService.deleteByUserId(userId)
        throw new ApiError(
            StatusCodes.UNAUTHORIZED,
            "Something unusual happened"
        )
    }

    const foundUser = await userRepo.getUserById(userId)
    if (!foundUser)
        throw new ApiError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)

    try {
        const decoded = verifyToken({
            token: refreshToken,
            publicKey: foundUser.publicKey,
        })
        if (decoded.userId !== userId)
            throw new ApiError(
                StatusCodes.UNAUTHORIZED,
                ReasonPhrases.UNAUTHORIZED
            )

        const deletedToken = await tokenService.deleteTokenByRefreshToken({
            refreshToken,
        })
        if (!deletedToken)
            throw new ApiError(
                StatusCodes.UNAUTHORIZED,
                ReasonPhrases.UNAUTHORIZED
            )

        await refreshTokenUsedService.createRefreshTokenUsed({
            refreshTokenUsed: deletedToken.refreshToken,
            userId: deletedToken.userId,
        })

        const tokenPair = createTokenPair({
            payload: { userId: foundUser.id, username: foundUser.username },
            privateKey: foundUser.privateKey,
        })

        const token = await tokenService.createToken({
            accessToken: tokenPair.accessToken,
            refreshToken: tokenPair.refreshToken,
            userId,
        })

        return {
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
        }
    } catch (error) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Refresh token failed")
    }
}

const signOut = async ({ res, accessToken }) => {
    const token = await tokenService.findOneToken({
        where: { accessToken },
    })
    if (!token)
        throw new ApiError(StatusCodes.UNAUTHORIZED, StatusCodes.UNAUTHORIZED)

    try {
        const deletedToken = await token.destroy()
        await refreshTokenUsedService.createRefreshTokenUsed({
            refreshTokenUsed: deletedToken.refreshToken,
            userId: deletedToken.userId,
        })
    } catch (error) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Refresh token failed")
    }
}

const forgotPassword = async ({ email }) => {
    const foundUser = await userService.getUserByEmail({ email })
    if (!foundUser) throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid email")

    const resetToken = createResetToken({
        payload: { userId: foundUser.id, username: foundUser.username },
        privateKey: foundUser.privateKey,
    })

    await resetTokenService.createResetToken({
        resetToken,
        userId: foundUser.id,
    })

    const serverDomain = `${protocol}://${host}:${port}`

    const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Forgot password</title>
        <style>
          .my-btn {
            background-color: #04aa6d;
            border: none;
            padding: 6px 12px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            border-radius: 20px;
            cursor: pointer;
            transition: 0.4s;
          }
    
          .my-btn:hover {
            background-color: rgb(233, 50, 0);
          }
        </style>
      </head>
      <body>
        <div class="message">
          <span>Reset your password: </span>
          <a
            style="color: white;"
            href="${serverDomain}/auth/reset-password?resetToken=${resetToken}"
            class="my-btn"
            >Click here!</a
          >
        </div>
      </body>
    </html>  
  `

    return await sendMail({
        from: "SE Ecommerce",
        email,
        subject: "Reset password",
        html,
    })
}

const resetPassword = async ({ resetToken, password }) => {
    const foundResetToken = await resetTokenRepo.getFullResetToken(resetToken)
    if (!foundResetToken)
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid reset token")
    foundResetToken.destroy()

    try {
        const decoded = verifyToken({
            token: resetToken,
            publicKey: foundResetToken.user.publicKey,
        })
        if (decoded.userId !== foundResetToken.user.id)
            throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid reset token")

        const passwordHash = await bcrypt.hash(password, saltRounds)
        const updatedUser = await userService.updateUserById(
            foundResetToken.userId,
            { password: passwordHash }
        )
        if (!updatedUser)
            throw new ApiError(
                StatusCodes.UNAUTHORIZED,
                "Reset password failed"
            )

        return updatedUser
    } catch (error) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid reset token")
    }
}

module.exports = {
    signUp,
    signUpAdmin,
    signIn,
    refreshToken,
    signOut,
    forgotPassword,
    resetPassword,
    oauth,
}
