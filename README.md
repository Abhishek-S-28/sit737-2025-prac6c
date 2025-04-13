# 737kubernetes - Interacting with and Updating the Deployed Application

This document outlines how to interact with the deployed 737kubernetes Node.js application using Kubernetes commands, and how to perform an update by modifying the application and rolling out a new version.

---

## 🚀 Part I: Interact with the Deployed Application

### ✅ 1. Verify Application is Running
Use the following commands to confirm the app is deployed and running correctly:

```bash
kubectl get pods
kubectl get services
```

You should see a pod in `Running` status and a service named `kube737-service` or similar.

### 🔄 2. Forward Local Port to Pod (Alternative to NodePort)
If you want to skip NodePort access, you can use `kubectl port-forward`:

```bash
kubectl port-forward deployment/737kubernetes-deployment 8080:3000
```

Then open in a browser:
```
http://localhost:8080
```
You should see:
> Hello from 737kubernetes Node.js app!

---

## 🏗️ Part II: Update the Application

### ✏️ 1. Modify the Code
Open `index.js` and change the response message:
```js
res.send('This is an UPDATED version of the 737kubernetes app!');
```

### ⚙️ 2. Rebuild Docker Image With a New Tag
```bash
docker build -t abhishek2806/737kubernetes-image:v2 .
```

### ⬆️ 3. Push the New Image to Docker Hub
```bash
docker push abhishek2806/737kubernetes-image:v2
```

### 🔧 4. Update the Deployment Config
Edit `deployment.yaml`:
```yaml
image: abhishek2806/737kubernetes-image:v2
```

### ⚖️ 5. Apply Updated Deployment
```bash
kubectl apply -f deployment.yaml
```

Or restart the rollout:
```bash
kubectl rollout restart deployment/737kubernetes-deployment
```

### ✅ 6. Confirm the Update
Check that the new pod is running:
```bash
kubectl get pods
```
View logs to confirm the update:
```bash
kubectl logs <new-pod-name>
```

Then access the app again:
```
http://localhost:30007
```
Output:
> This is an UPDATED version of the 737kubernetes app!

---

## 📂 Files Affected
```
├── index.js                  # Updated message
├── Dockerfile
├── deployment.yaml           # Updated image tag
├── service.yaml
```

---

## 📝 Notes
- Always update the image tag when pushing new versions to avoid caching issues.
- Use `kubectl rollout restart` if the image is not automatically pulled again.

---

**Author**: Abhishek Srinivasan  
**GitHub**: [Abhishek-S-28](https://github.com/Abhishek-S-28/sit737-2025-prac6p)

