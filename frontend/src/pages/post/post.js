import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
import { initialPostState } from '../../reducers';
import { Comments, PostContent, PostForm } from './components';
import { loadPostAsync, RESET_POST_DATA } from '../../action';
import { selectPost } from '../../selectors';
import { Error, PrivateContent } from '../../components';
import { ROLE } from '../../constants';
import styled from 'styled-components';

const PostContainer = ({ className }) => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const isCreating = !!useMatch('/post');
	const isEditing = !!useMatch('/post/:id/edit');

	const dispatch = useDispatch();
	const params = useParams();
	const post = useSelector(selectPost);

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}

		dispatch(loadPostAsync(params.id)).then((postData) => {
			setError(postData.error);
			setIsLoading(false);
		});
	}, [dispatch, params.id, isCreating]);

	if (isLoading) {
		return null;
	}

	const SpecificPostPage =
		isCreating || isEditing ? (
			<PrivateContent access={[ROLE.ADMIN]} serverError={error}>
				<div className={className}>
					<PostForm post={isCreating ? initialPostState : post} />
				</div>
			</PrivateContent>
		) : (
			<div className={className}>
				<PostContent post={post} />
				<Comments comments={post.comments} postId={post.id} />
			</div>
		);

	return error ? <Error error={error} /> : SpecificPostPage;
};

export const Post = styled(PostContainer)`
	display: flex;
	flex-direction: column;
	margin: 40px 0;
	padding: 40px 80px;
`;
