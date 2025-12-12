import jwt from "jsonwebtoken"
import UserRefreshTokenModel from "../models/UserRefreshToken.js"


const verifyRefreshToken = async (refreshToken) =>{
    try {
        const privateKey = process.env.JWT_REFRESH_TOKEN_SECRET_KEY;

        const UserRefreshToken = await UserRefreshTokenModel.findOne({token : refreshToken});

        if(!UserRefreshToken){
            throw {error: true , message : "Invalid Refresh Token in file verifyrefreshToken"};
        }


        const tokenDetails = jwt.verify(refreshToken,privateKey);

        return{
            tokenDetails,
            error: false,
            message: "Valid Refresh Token"
        }
    } catch (error) {
        throw { error: true , message : " Invalid Refresh Token in file verifyrefreshToken"}
    }
}


export default verifyRefreshToken;