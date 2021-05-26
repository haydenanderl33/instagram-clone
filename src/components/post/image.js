import propTypes from 'prop-types'

const Image = ({src, caption}) => {
    return (
        <img className='object-contain h-100 w-100' src={src} alt={caption} />
    )
}

export default Image

Image.propTypes = {
    src: propTypes.string.isRequired,
    caption: propTypes.string.isRequired
}
