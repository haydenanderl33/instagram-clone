import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Header = ({ username }) => {
  return (
    <div className="flex border border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center">
        <Link to={`/p/${username}`}>
          <img
            className="rounded-full h-8 w-8 flex mr-3"
            src={`/images/avatars/${username}.jpg`}
            alt={`${username} profile pic`}
          />
          <p className="font-bold">{username}</p>
        </Link>
      </div>
    </div>
  );
};

export default Header;

Header.propTypes ={
    username: propTypes.string.isRequired
}
