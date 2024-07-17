import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentAsync } from '../../../../action';
import { selectUserRole } from '../../../../selectors';
import { Icon } from '../../../../components';
import { Comment } from './components';
import { PROP_TYPES, ROLE } from '../../../../constants';
import styled from 'styled-components';

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('');
	const userRole = useSelector(selectUserRole);
	const dispatch = useDispatch();

	const onNewCommentAdd = (postId, content) => {
		dispatch(addCommentAsync(postId, content));
		setNewComment('');
	};

	const isGuest = userRole === ROLE.GUEST;

	return (
		<div className={className}>
			{!isGuest && (
				<div className="new-comment">
					<textarea
						name="comment"
						value={newComment}
						placeholder="Комментарий..."
						onChange={({ target }) => {
							setNewComment(target.value);
						}}
					></textarea>
					<Icon
						id="fa-paper-plane-o"
						margin="0 0 0 5px"
						size="18px"
						onClick={() => {
							onNewCommentAdd(postId, newComment);
						}}
					/>
				</div>
			)}
			<div className="comments">
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						postId={postId}
						id={id}
						author={author}
						content={content}
						publishedAt={publishedAt}
					/>
				))}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	width: 580px;
	margin: 10px auto;

	& .new-comment {
		display: flex;
		width: 100%;
		margin: 20px 0 0;
	}

	& textarea {
		width: 100%;
		height: 120px;
		font-size: 18px;
		resize: none;
		padding: 5px;
	}
`;

Comments.propTypes = {
	comments: PropTypes.arrayOf(PROP_TYPES.COMMENT).isRequired,
	postId: PropTypes.string.isRequired,
};
