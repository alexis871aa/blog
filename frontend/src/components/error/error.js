import { H2 } from '../h2/h2';
import { PROP_TYPES } from '../../constants';
import styled from 'styled-components';

export const ErrorContainer = ({ className, error }) =>
	error && (
		<div className={className}>
			<H2>Ошибка</H2>
			<div>{error}</div>
		</div>
	);

export const Error = styled(ErrorContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 18px;
`;

Error.propTypes = {
	error: PROP_TYPES.ERROR,
};
