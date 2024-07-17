import PropTypes from 'prop-types';
import { ROLE } from './role';
import { ERROR } from './error';

const ROLE_ID = PropTypes.oneOf(Object.values(ROLE));

export const PROP_TYPES = {
	ROLE_ID,
	ROLE: PropTypes.shape({
		id: ROLE_ID,
		name: PropTypes.string.isRequired,
	}),
	ERROR: PropTypes.oneOf(Object.values(ERROR)),
	COMMENT: PropTypes.shape({
		id: PropTypes.string.isRequired,
		author: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		publishedAt: PropTypes.string.isRequired,
	}),
	POST: PropTypes.shape({
		title: PropTypes.string.isRequired,
		imageUrl: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		publishedAt: PropTypes.string.isRequired,
	}),
};
