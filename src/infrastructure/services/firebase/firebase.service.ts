import { Injectable } from '@nestjs/common';
import { getMessaging } from 'firebase-admin/messaging';
import {
  initializeApp,
  getApps,
  App,
  ServiceAccount,
  cert,
} from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { Messaging } from 'firebase-admin/lib/messaging/messaging';
import { FirebaseConfig } from '@domain/config/firebase.interface';

@Injectable()
export class FirebaseService {
  public readonly app: App;
  public readonly firestore: Firestore;
  public readonly fcmMessage: Messaging;

  constructor(private readonly firebaseConfig: FirebaseConfig) {
    console.log(firebaseConfig);
    const firebaseAdminConfig: ServiceAccount = {
      projectId: firebaseConfig.getFirebaseProjectId(),
      privateKey: firebaseConfig.getFirebasePrivateKey(),
      clientEmail: firebaseConfig.getFirebaseClientEmail(),
    };
    if (!this.app && getApps().length === 0) {
      if (process.env.NODE_ENV !== 'local') {
        this.app = initializeApp({
          credential: cert(firebaseAdminConfig),
          databaseURL: `https://${firebaseAdminConfig.projectId}.firebaseio.com`,
        });
      } else {
        this.app = initializeApp({
          credential: cert(firebaseAdminConfig),
          databaseURL: `https://${firebaseAdminConfig.projectId}.firebaseio.com`,
        });
      }
    } else {
      this.app = getApps()[0];
    }

    this.firestore = getFirestore(this.app);
    this.fcmMessage = getMessaging(this.app);
  }
}
