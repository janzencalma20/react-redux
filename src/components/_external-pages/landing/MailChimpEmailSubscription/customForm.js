import {Button, TextField, Container, Grid} from "@mui/material";
import './customForm.scss'
import {styled} from "@mui/material/styles";

const CustomForm = ({ status, message, onValidated }) => {
    let email;
    const submit = () =>
        email &&
        onValidated({
            EMAIL: email.value,
        });
    const ContentStyle = styled('div')(({ theme }) => ({
        textAlign: 'center',
        position: 'relative',
        marginBottom: theme.spacing(10),
        [theme.breakpoints.up('md')]: {
            height: '100%',
            marginBottom: 0,
            textAlign: 'left',
            display: 'inline-flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start'
        }
    }));

    return (
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
            <Grid container spacing={5} color="blue" direction="row-reverse" justifyContent="center">
                <Grid item xs={12} md={4}>
        <center>
            <Grid container>
                <ContentStyle>
        <div align="center" className="customForm">
            {status === "sending" && <div className="customFormSending">sending...</div>}
            {status === "error" && (
                <div align="center" className="customFormError"
                     dangerouslySetInnerHTML={{ __html: message }}
                />
            )}
            {status === "success" && (
                <div align="center" className="customFormSuccess"
                     dangerouslySetInnerHTML={{ __html: message }}
                />
            )}
<p align="center">
    <TextField className="customInput"
               inputProps={{ref:node=>(email = node)}}
           type="email"
           tabIndex="1"
           size="large"
           placeholder="Please enter your email here"
           color='primary'

    />
            <Button variant="contained" size="large" onClick={submit}>
                Subscribe
            </Button>

</p>

        </div>
                </ContentStyle>
            </Grid>
        </center>

                </Grid>
            </Grid>
        </Container>
    );
};

export default CustomForm