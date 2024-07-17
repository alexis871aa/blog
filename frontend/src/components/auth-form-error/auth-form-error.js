import PropTypes from 'prop-types';
import styled from 'styled-components';

const AuthFormErrorContainer = ({ className, children }) => (
	<div className={className}>{children}</div>
);

export const AuthFormError = styled(AuthFormErrorContainer)`
	margin: 10px 0 0;
	padding: 10px;
	font-size: 18px;
	background-color: #fcadad;
`;

AuthFormError.propTypes = {
	children: PropTypes.node.isRequired,
};
