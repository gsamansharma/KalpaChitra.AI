

pipeline {
    agent any
    stages {
        stage('Installing dependencies') { 
            steps {
	    	dir('client'){
		sh 'npm install'
		}
            }
        }
        stage('Build') { 
            steps {
	    	dir('client'){
		sh 'npm run build'
		}
            }
        }
        stage('Run') { 
            steps {
	    	dir('client'){
            sh 'npm run start &'
		    sh 'sleep 1 && echo $! > .pidfile '
            sh '''
            echo "Visit http://localhost:3000 "
          '''
            input message: 'Finished using the web site? (Click "Proceed" to continue)'
            sh '''
               killall -9 node
          '''
		}
            }
        }
    }
}


