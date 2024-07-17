import { useEffect, useMemo, useState } from 'react';
import { Pagination, PostCard, Search } from './components';
import { PAGINATION_LIMIT } from '../../constants';
import { request } from '../../utils';
import { debounce } from './utils';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		request(
			`/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
		).then(({ data: { posts, lastPage } }) => {
			setPosts(posts);
			setLastPage(lastPage);
			setLoading(false);
		});
	}, [page, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	return (
		<div className={className}>
			<div className="posts-and-search">
				<Search searchPhrase={searchPhrase} onChange={onSearch} />
				{loading ? (
					<div className="loading">Загрузка постов...</div>
				) : posts.length > 0 ? (
					<div className="post-list">
						{posts.map(({ id, imageUrl, title, publishedAt, comments }) => (
							<PostCard
								key={id}
								id={id}
								imageUrl={imageUrl}
								title={title}
								publishedAt={publishedAt}
								commentsCount={comments.length}
							/>
						))}
					</div>
				) : (
					<div className="no-post-found">Статьи не найдены</div>
				)}
			</div>
			{lastPage > 1 && posts.length > 0 && (
				<div className="pagination">
					<Pagination page={page} lastPage={lastPage} setPage={setPage} />
				</div>
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	& .post-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px 20px 80px;
	}

	& .no-post-found {
		text-align: center;
		font-size: 18px;
		margin-top: 40px;
	}

	& .loading {
		text-align: center;
		font-weight: bold;
		margin-top: 5px;
	}
`;
