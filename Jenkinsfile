

pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
	    	dir('client'){
		sh 'npm install'
		}
            }
        }
    }
}


