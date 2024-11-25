/* eslint-disable @typescript-eslint/no-explicit-any */
// // app/api/auth/[...nextauth]/route.js
// import NextAuth, { AuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';

// export const authOptions: AuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         policeID: { label: 'policeID', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//        if(!credentials)
//             return null
    
//         const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 policia_id: credentials.policeID,
//                 contrasena: credentials.password,
//             }),
//         })

//         const resJson = await res.json()
//         console.log(resJson)
//         if(res.ok && resJson.data) {
//             return resJson.data
//         }
        
//         return null
//       },
//     }),
//   ],
//   session: {
//     strategy: 'jwt', // Usar JWT para almacenar la sesión
//   },
//   // callbacks: {
//   //   async jwt({ token, user }: any) {
//   //     if (user) {
//   //       token.accessToken = user.access_token;
//   //     }
//   //     return token;
//   //   },
//   //   async session({ session, token }: any) {
//   //     session.user = {
//   //       accessToken: token.access_token,
//   //     };
//   //     return session;
//   //   },
//   // },
//   // secret: process.env.NEXTAUTH_SECRET || 'clave_secreta',
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
