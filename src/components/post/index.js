import {useRef } from 'react'
import propTypes from 'prop-types'
import Header from './header'
import Image from './image'
import Actions from './actions'
import Footer from './footer'
import Comments from './comments'


const Post = ({content}) => {

    const commentInput = useRef(null)
    const handleFocus = () => commentInput.current.focus()

    return (
        <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
        <Header username={content.username}/>
        <Image src={content.imageSrc} caption={content.caption}/>
        <Actions docId={content.docId} totalLikes={content.likes.length} likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}/>
        <Footer caption={content.caption} username={content.username} />
        <Comments docId={content.docId} comments={content.comments} posted={content.dateCreated} commentInput={commentInput}/>
        </div>
    )
}

export default Post

Post.propTypes = {
    content: propTypes.shape({
      username: propTypes.string.isRequired,
      imageSrc: propTypes.string.isRequired,
      caption: propTypes.string.isRequired,
      docId: propTypes.string.isRequired,
      userLikedPhoto: propTypes.bool.isRequired,
      likes: propTypes.array.isRequired,
      comments: propTypes.array.isRequired,
      dateCreated: propTypes.number.isRequired
    })
}
