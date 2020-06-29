import { useState, useEffect } from 'react'
import router from 'next/router';
import { auth } from '../../firebase';
let withAuth = () => {
    let [status, setStatus] = useState('LOADING')
    useEffect(() => {
        auth.onAuthStateChanged(authUser => {
            console.log(authUser);
            if (authUser) {
                setStatus('SIGNED_IN')
            } else {
                router.push('/');
            }
        });
    })

    let renderContent = () => {
        if (status == 'LOADING') {
            return <h1>Loading ......</h1>;
        } else if (status == 'SIGNED_IN') {
            return <Component {...this.props} />
        }
    }

    return (
        <>
            {renderContent}
        </>
    );
};

export default withAuth;