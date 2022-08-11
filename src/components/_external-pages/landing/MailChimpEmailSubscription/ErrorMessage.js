import MailchimpSubscribe from "react-mailchimp-subscribe"
import CustomForm from "./customForm";

const errorMessage = () => {
    return (
        <>

                    <MailchimpSubscribe url="https://cohere-sim.us14.list-manage.com/subscribe/post?u=3a2b9684f01182023a8e71e64&id=d741306f4a" render={({ subscribe, status, message }) => (
                        <CustomForm status={status} message={message} onValidated={formData => subscribe(formData)} />
                    )}
                    />

        </>
    );
}

export default errorMessage;



