exports.sanitizeUser = function (user) {
  return {
    _id: user._id,
    fullName: user.fullName,
    Phone: user.Phone,
    Email: user.Email,
    profileImg: user.profileImg,
    userName: user.userName,
  };
};
