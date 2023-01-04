import React, { createContext, useEffect, useRef, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.config'



export const authContext = createContext();


const ContextProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('')

    const googleProvider = new GoogleAuthProvider();

    //signup 
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }


    //signin 
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }


    //google login 
    const providerLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    //update profile
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => unsubscribe();
    }, [])


    const searchRef = useRef();




    const authInfo = {
        createUser,
        user,
        loading,
        logOut,
        signIn,
        providerLogin,
        updateUserProfile,
        searchRef,
        search,
        setSearch
    }
    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    );
};

export default ContextProvider;