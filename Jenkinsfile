
  
def BuildVersion

 pipeline {
   options {
      timeout(time: 30, unit: 'MINUTES')def BuildVersion

   }
  environment {
    registry = "dockerhubuser/repo"
    registryCredential = 'dockerhub'
    dockerImage = ''
  }
    agent {
        label 'master'
    }
    stages {
        stage ('Checkout') {
            steps {
                script {
                    deleteDir()
                    checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/DevOpsINT/Course.git']]])def BuildVersion

            			       		CurrentGitVersion = sh script:"git tag | sort -r | head -1", returnStdout: true
                        CurrentGitVersion = CurrentGitVersion.trim()
                        echo("CurrentGitVersion Is: ${CurrentGitVersion}")
                        CurrentCommitIdShort = sh script:"git rev-parse HEAD | cut -c1-10", returnStdout: true
                        echo("CurrentCommitIdShort Is: ${CurrentCommitIdShort}")
                        BuildVersion = "${CurrentGitVersion}_${CurrentCommitIdShort}"
                        BuildVersion = BuildVersion.trim()
                        echo("BuildVersion Is: ${BuildVersion}")

                }
            }
        }
        stage ('Unit Test') {
            steps {
                script {
                    dir ('./testDevdir/') {
                        try {
                            sh ''
                            sh ''
                            echo("..")
                        } catch (err) {
                            println("...")
                            currentBuild.result = 'UNSTABLE'
                        }
                      sh 'pwd'
                      sh 'ls'
                    }
                }
            }
        }
        
         }
}
