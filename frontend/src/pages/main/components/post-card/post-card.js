import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from '../../../../components';
import styled from 'styled-components';

const PostCardContainer = ({
	className,
	id,
	imageUrl,
	title,
	publishedAt,
	commentsCount,
}) => {
	return (
		<div className={className}>
			<Link to={`/post/${id}`}>
				<img src={imageUrl} alt={title} />
				<div className="post-card-footer">
					<h4>{title}</h4>
					<div className="post-card-info">
						<div className="published-at">
							{publishedAt && (
								<Icon
									inactive="true"
									id="fa-calendar-o"
									size="18px"
									margin="-2px 7px 0 0"
								/>
							)}
							{publishedAt}
						</div>
						<div className="comment-count">
							<Icon
								inactive="true"
								id="fa-comment-o"
								size="18px"
								margin="0 7px 0 0"
							/>
							{commentsCount}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const PostCard = styled(PostCardContainer)`
	display: flex;
	flex-direction: column;

	width: 280px;
	margin: 20px;
	border: 1px solid #000;

	& img {
		display: block;
		width: 100%;
	}

	& .post-card-footer {
		display: flex;
		flex-direction: column;
		padding: 5px;
		border-top: 1px solid #000;
	}

	& h4 {
		margin: 0;
		height: 100px;
	}

	& .post-card-info {
		display: flex;
		justify-content: space-between;
		margin-top: 5px;
	}

	& .published-at {
		display: flex;
	}

	& .comment-count {
		margin: -3px 0 0 0;
		display: flex;
	}
`;

PostCard.propTypes = {
	id: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	commentsCount: PropTypes.number.isRequired,
};
