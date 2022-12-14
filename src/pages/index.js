import React, { useState } from 'react';
import Head from 'next/head';
import LoginModal from '@components/modals/LoginModal';

export default function Home() {

  return (
    <>
      <Head>
        <title>AnimeO - Feed</title>
      </Head>

      <LoginModal />
    </>
  );
}
