//@Library('Utilities') _
import groovy.json.JsonSlurper
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
                     node('master'){
                         dir('Release') {
                             deleteDir()
                             checkout([$class: 'GitSCM', branches: [[name: 'Prod']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'git-cred-id', url: "https://github.com/intclassproject/Release.git"]]])
                             path_json_file = sh(script: "pwd", returnStdout: true).trim() + '/' + 'Prod' + '.json'
                             Current_version = Return_Json_From_File("$path_json_file").release.services.intapi.version
                         }
                     }
                     
                     dir('INT_API') {
                         deleteDir()
                         checkout([$class: 'GitSCM', branches: [[name: 'Dev']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'git-cred-id', url: "https://github.com/intclassproject/INT_API.git"]]])
                         Commit_Id = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                         BuildVersion = Current_version + '_' + Commit_Id
                         println("Checking the build version: $BuildVersion")

                     }
                 }
             }
         }
         stage('UT') {
             steps {
                 println('Will be added soon ')

             }
         }
//         stage('Build') {
//             steps {
//                 script {
//                     dir('INT_DB') {
//                         try {
//
//                           docker.build("node:")
//
//                         }
//                         catch (exception) {
//                             println "The image build is failed"
//                             currentBuild.result = pipeline_failure_indicator_string
//                             throw exception
//                         }
//
//                     }
//                     dir(global_vars.int_api_folder){
//                         try{
//                             docker.build("$node_module:$BuildVersion")
//                         }
//                         catch (exception){
//                             println "The image build is failed"
//                             currentBuild.result = pipeline_failure_indicator_string
//                             throw exception
//                         }
//                     }
//
//
//                 }
//
//
//             }
//         }

     }
 }
def Return_Json_From_File(file_name){
    return new JsonSlurper().parse(new File(file_name))
}