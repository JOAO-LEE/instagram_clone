import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const getUser = async (userUid: string) => {
    const userQuery = query(collection(db, "users"), where("uid", "==", userUid));
    const userDocs = await getDocs(userQuery);
    return userDocs.docs[0];
}

export { getUser };