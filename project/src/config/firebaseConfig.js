import "firebase/auth"; // se si utilizza l'autenticazione
import "firebase/firestore"; // se si utilizza il database Firestore
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALRfPY_cCJdhsCwS6EwTQn-lXMo6o4LAE",
  authDomain: "protocollorisparmio.firebaseapp.com",
  projectId: "protocollorisparmio",
  storageBucket: "protocollorisparmio.appspot.com",
  messagingSenderId: "296460273585",
  appId: "1:296460273585:web:52230035d8a8b05a90df90",
  measurementId: "G-N118ZFD9FK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = initializeApp.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // L'utente è autenticato
        setUser(authUser);
      } else {
        // L'utente non è autenticato
        setUser(null);
      }
    });

    return () => {
      // Pulisci il listener dell'autenticazione quando il componente si smonta
      unsubscribe();
    };
  }, []);

  const handleSignIn = async () => {
    const provider = new initializeApp.auth.GoogleAuthProvider();
    await initializeApp.auth().signInWithPopup(provider);
  };

  const handleSignOut = async () => {
    await initializeApp.auth().signOut();
  };

  return (
      <div>
        {user ? (
          <div>
            <p>Ciao, {user.displayName}!</p>
            <button onClick={handleSignOut}>Esci</button>
          </div>
        ) : (
          <div>
            <p>Non sei autenticato.</p>
            <button onClick={handleSignIn}>Accedi con Google</button>
          </div>
        )}
      </div>
  )