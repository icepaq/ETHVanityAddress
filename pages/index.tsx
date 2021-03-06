import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Swal from 'sweetalert2'

const Home: NextPage = () => {
    const submit = (e: any) => {
        const code = document.getElementById('code') as HTMLInputElement;
        const wallet = document.getElementById('wallet') as HTMLInputElement;

        console.log(code.value, wallet.value);

        if(wallet.value.length > 7) { // Includex 0x
            Swal.fire('Wallet start must be less than 5 characters');
            return;
        }

        fetch('/api/genkey?wallet=' + wallet.value + '&key=' + code.value).then(res => res.json()).then(res => {
            console.log(res);
            if(res.wallet.status == 'generating') {
                window.location.href = '/getwallet';
            } else {
                Swal.fire('Error!', res.message, 'error');
            }
        });
    }
    return(
        <>
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h2 className={styles.title}>Custom ETH Wallet</h2>
                <div className={styles.form}>
                    <input type='text' placeholder='Access Code' className={styles.input} id='code' /> <br />
                    <input type='text' placeholder='0xAnton' className={styles.input} id='wallet' />

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