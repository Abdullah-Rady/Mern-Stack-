const User = require("../models/users/user.model");
const sendEmail = require("../utils/emails/sendEmail");
const Token = require("../models/utils/token.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const clientURL = "localhost:5173";

const requestPasswordReset = async (email) => {
  try {
    const user = await User.findOne({ email });

    if (!user) throw new Error("User does not exist");

    let token = await Token.findOne({ _userId: user._id });
    if (token) await token.deleteOne();
    
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, 10);

    await new Token({
      _userId: user._id,
      token: hash,
      createdAt: Date.now(),
    }).save();


    const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;

    sendEmail(
      user.email,
      "Password Reset Request",
      { name: user.first_name + user.last_name, link: link },
      "/template/requestResetPassword.handlebars"
    );


    return link;
  } catch (error) {
    throw new Error(error);
  }

}

const resetPassword = async (userId, token, password) => {

    try{
        let passwordResetToken = await Token.findOne({ userId });

        if (!passwordResetToken) {
          throw new Error("Invalid or expired password reset token");
        }
      
        const isValid = bcrypt.compare(token, passwordResetToken.token);

        if (!isValid) {
          throw new Error("Invalid or expired password reset token");
        }
      
      
        await User.updateOne(
          { _id: userId },
          { $set: { password: password } },
          { new: true }
        );
      
        const user = await User.findById({ _id: userId });
      
        sendEmail(
          user.email,
          "Password Reset Successfully",
          {
            name: user.name,
          },
          "/template/requestResetPassword.handlebars"
        );
        await passwordResetToken.deleteOne();
        return true;
 
    } catch (error) {
        throw new Error(error);
    }

}

module.exports = { requestPasswordReset, resetPassword};
