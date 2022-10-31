import { StyledDiv } from './styles'

type BodyProps = {
	children: React.ReactNode
}

export const Body = ({ children }: BodyProps) => {
	return <StyledDiv>{children}</StyledDiv>
}
