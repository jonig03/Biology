import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AvatarImage from "@material-ui/core/Avatar";
import { useSelector } from "react-redux";
import { ReactComponent as Loading } from "../../svg/loading.svg";
import "./css/index.css";

const useStyles = makeStyles(theme => ({
  small1: {
    width: "50px",
    height: theme.spacing(7)
  }
}));

const Avatar = ({ size }) => {
  const [avatar, setAvatar] = useState(null);
  const { authenticated, fullName, userID } = useSelector(
    state => state.isAuthenticated
  );
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    try {
      // a path we KNOW is totally bogus and not a module
      // console.log(props);
      setAvatar(require(`../../usersMedia/${userID}/Avatar.png`));
    } catch (e) {
      console.log("oh no big error");
      setAvatar(false);
      console.log(e);
    }
    setIsLoading(false);
  }, [userID]);

  if (isLoading || avatar === null) return <Loading />;
  if (!authenticated) return null;

  console.log(fullName);

  return (
    <div className="d-flex p2 flex-row align-items-center mb-3">
      {avatar ? (
        <AvatarImage
          alt="Avatar"
          src={avatar}
          // className={`avatarSize${size}`}
          style={{
            width: size * 10 * 2,
            height: size * 10 * 2
          }}
        />
      ) : (
        <AvatarImage
          style={{
            width: size * 10 * 2,
            height: size * 10 * 2
          }}
        />
      )}
      <div
        styles={{
          fontWeight: 300,
          lineHeight: 1.2
        }}
      >
        <div
          className="ml-2"
          // style={{
          //   fontSize: size * 5 * 2
          // }}
        >
          {fullName}
          <span className="badge badgeBlueColor badgeSizeProfile text-uppercase">
            user
          </span>
        </div>
      </div>
    </div>
  );
};

Avatar.defaultProps = {
  size: 2
};

export default Avatar;
