import admin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';

export const checkFirebaseToken = async (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers.authorization;
    if (!headerToken) {
      return res.status(401).send({ message: "No token provided" });
    }
  
    // Check that the header has the format "Bearer <token>"
    if (headerToken.split(' ')[0] !== 'Bearer') {
      return res.status(401).send({ message: "Unauthorized request" });
    }
  
    const token = headerToken.split(' ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        // Here we just add the uid to the req object
        req.body.uid = decodedToken.uid;
        next();
    } catch (error) {
        res.status(401).send({ message: "Could not authorize request" });
    }
};
