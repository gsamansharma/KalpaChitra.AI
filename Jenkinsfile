pipeline {
    agent any

    tools {
        nodejs 'NodeJS-18'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('server') {
                    sh 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('client') {
                    sh 'npm install'
                }
            }
        }

        stage('Build React Frontend') {
            steps {
                dir('client') {
                    sh 'CI=true npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def imageName = "kalpachitra-ai:${env.BUILD_NUMBER}"
                    echo "Building Docker image: ${imageName}"
                    sh "docker build -t ${imageName} ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                echo "Skipping Docker push for this example. You would configure credentials and push here."
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deployment stage. This is where you would run your deployment scripts.'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}

