import gql from "graphql-tag";

export const QUESTION_LIST_QUERY = gql`
    query questionList{
        questionList{
            userName,date,slug,body,userImageUrl
        }
    }
`
export const QUESTION_QUERY = gql`
    query question($slug:String!){
        question(slug:$slug){
            id,userName,body,date,,userImageUrl,slug
        }
    }
`