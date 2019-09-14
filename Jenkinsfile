@Library('Utilities') _
def BuildVersion
def Current_version
def NextVersion
 pipeline {

     options {
         timeout(time: 30, unit: 'MINUTES')
     }
     agent { label 'slave' }
     stages {
         stage('Checkout') {
             steps {
                 script {
                     node('master') {
                         dir(release_dir) {
                             deleteDir()
                             checkout([$class: 'GitSCM', branches: [[name: prod]], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: git_cred_id, url: release_repo]]])
                             path_json_file = sh(script: "pwd", returnStdout: true).trim() + path_seperator + prod + suffix_json
                             Current_version = Return_Json_From_File(path_json_file).Services.INT_API
                         }
                     }

                     dir(global_vars.int_api_folder) {
                         deleteDir()
                         checkout([$class: 'GitSCM', branches: [[name: dev]], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: git_cred_id, url: int_api_rep]]])
                         Commit_Id = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                         BuildVersion = Current_version + underscore + Commit_Id
                         println("Checking the build version: $BuildVersion")

                     }
                     dir(dev) {
                         deleteDir()
                         checkout([$class: 'GitSCM', branches: [[name: dev]], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: git_cred_id, url: release_repo]]])
                         last_digit_current_version = Return_last_digit_current_version(Current_version)
                         NextVersion = Return_Next_Version(Current_version, last_digit_current_version)

                     }
                     dir(global_vars.db_api_folder) {
                         deleteDir()
                         checkout([$class: 'GitSCM', branches: [[name: dev]], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: git_cred_id, url: int_db_rep]]])


                     }
                 }
             }
         }
         stage('UT') {
             steps {
                 println('Will be added soon ')

             }
         }
         stage('Build') {
             steps {
                 script {
                     dir(global_vars.db_api_folder) {
                         try {

                           docker.build("$mongodb_module:$BuildVersion")

                         }
                         catch (exception) {
                             println "The image build is failed"
                             currentBuild.result = pipeline_failure_indicator_string
                             throw exception
                         }

                     }
                     dir(global_vars.int_api_folder){
                         try{
                             docker.build("$node_module:$BuildVersion")
                         }
                         catch (exception){
                             println "The image build is failed"
                             currentBuild.result = pipeline_failure_indicator_string
                             throw exception
                         }
                     }


                 }


             }
         }

     }
 }