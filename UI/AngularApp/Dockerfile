#Docker fiel: A set of instructions to help Docker build an image
#Step(s): Build an Image and then deploy the image

#Step 1: Compile and Build Angular Codebase

FROM node:18.19-alpine AS build
#Set the working directory
WORKDIR /app

COPY package*.json ./
#COPY package-lock.json ./

#Install all dependencies
RUN npm install

RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points

#Add source code to the app
COPY . .
#Generate the application build
RUN npm run build 
#--configuration=production

#CMD /usr/src/app/node_modules/.bin/ng serve --host=0.0.0.0 --disableHostCheck



#Step 2: Serve app with nginx server
FROM nginx:stable
#Copy the build output tp replace the default nginx contents
COPY default.conf /etc/nginx/conf.d
COPY --from=build /app/dist/to-do-list/browser /usr/share/nginx/html
EXPOSE 80
