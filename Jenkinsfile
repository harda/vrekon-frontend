echo 'hello from Pipeline'
pipeline {
    agent any
    environment {
        DOCKER_IMAGE_NAME = "harda00/vrekon-frontend"
    }
    stages {
        stage('Build') {
            steps {
                echo 'Running build automation'
                sh 'ng build --output-path=dist'
                archiveArtifacts artifacts: 'dist/vrekon-frontend.zip'
            }
        }
        stage('Build Docker Image') {
            when {
                branch 'master'
            }
            steps {
                script {
                    app = docker.build(DOCKER_IMAGE_NAME)
                    app.inside {
                        sh 'echo Hello, World!'
                    }
                }
            }
        }
        stage('Push Docker Image') {
            when {
                branch 'master'
            }
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker_hub_login') {
                        app.push("${env.BUILD_NUMBER}")
                        app.push("latest")
                    }
                }
            }
        }
        stage('DeployToDevelopment') {
            when {
                branch 'master'
            }
            steps {
                kubernetesDeploy(
                    kubeconfigId: 'kubeconfig',
                    configs: 'vrekon-frontend-kube.yml',
                    enableConfigSubstitution: true
                )
            }
        }
    }
}
