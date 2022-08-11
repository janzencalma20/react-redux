import ErrorMessage from "./ErrorMessage"
import {Container} from '@mui/material';

const pageNotFound = () => {
    return (
        <>
            <Container maxWidth color="blue">
            <div className="container">
                <div className="pageContainer">
                    <div className="errorContainer">
                        <ErrorMessage />
                    </div>
                </div>
            </div>
            </Container>
        </>
    )
}

export default pageNotFound;
