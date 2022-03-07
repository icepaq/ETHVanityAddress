import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Swal from 'sweetalert2'

const Home: NextPage = () => {
    const submit = (e: any) => {
        const code = document.getElementById('code') as HTMLInputElement;

        fetch('/api/getwallet?key=' + code.value).then(res => res.json()).then(res => {
            let HTML;
            
            if(res.wallet == null) {
                 HTML = 'Your wallet is not ready yet';
            } else {
                HTML = 'Address: ' + res.wallet.address + '<br />' +
                        'Private Key: ' + res.wallet.privateKey + '<br />' +
                        'Public Key: ' + res.wallet.publicKey;
            }
            
            Swal.fire({
                title: 'Wallet',
                html: HTML,
            });
            console.log(res);
        });
    }
    return(
        <>
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h2 className={styles.title}>Please Enter Your Access Code</h2>
                <div className={styles.form}>
                    <input type='text' placeholder='Access Code' className={styles.input} id='code' /> <br />

                    <div className={styles.button} onClick={submit}>
                        Submit
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home;