import Vue from 'vue'

import api from './api-object'
import { url } from './config'

/**
 * Staging or Live mode.
 */
const mode = 'staging'

/**
 *  config with auth token
 */
const getRequestConfig = {}

/**
 * config with auth token and content type
*/ 
const postRequestConfig = {}

const $api = {
  
  // hardcoded data
  async getLatestForumActivity () {
    await fetch('https://jsonplaceholder.typicode.com/todos/1')

    return {
      data: {
        "status": "success",
        "status_code": 404,
        "messages": [],
        "result": {
          "total_results": 10,
          "page": 1,
          "items_per_page": 10,
          "total_pages": 1,
          "items_type": "Thread",
          "items": [
            {
              "id": 1,
              "title": "Why did this image score so badly?	",
              "creator": {
                "user_id": 2,
                "username": "GolferDDS"
              },
              "has_unread_messages": true,
              "replies_count": 2,
              "views_count": 2,
              "last_post_data": {
                "post_id": 2,
                "creator": {
                  "user_id": 2,
                  "username": "user"
                },
                "posted_at": "2019-08-21T13:31:42+07"
              },
              "section": {
                "section_id": 2,
                "section_title": "Challenge Results"
              }
            },
            {
              "id": 2,
              "title": "Dpc word association game",
              "creator": {
                "user_id": 2,
                "username": "name"
              },
              "has_unread_messages": true,
              "replies_count": 2,
              "views_count": 2,
              "last_post_data": {
                "post_id": 2,
                "creator": {
                  "user_id": 2,
                  "username": "Cyrilda"
                },
                "posted_at": "2019-08-09T18:31:42+07"
              },
              "section": {
                "section_id": 2,
                "section_title": "General Discussion"
              }
            }
          ]
        }

      }
    }
  },

  // hardcoded data
  async getChallangesOpenForSubmission () {
    await fetch('https://jsonplaceholder.typicode.com/todos/1')

    return {
      data: {
        "status": "success",
        "status_code": 200,
        "messages": [],
        "result": {
          "total_results": 10,
          "page": 1,
          "items_per_page": 10,
          "total_pages": 1,
          "items_type": "Challenge",
          "items": [
            {
              "id": 2,
              "title": "Book Cover II",
              "type": "member",
              "description": "Invent a fake book of any genre (novel, biography, textbook, anything) and show us the cover.",
              "ruleset": "minimal",
              "extra_rules": "",
              "entries_count": 20,
              "user_votes_count": 0,
              "submission_start": "2005-08-09T18:31:42+07",
              "submission_end": "2019-09-15T18:31:42+07",
              "vote_start": "2005-08-09T18:31:42+07",
              "vote_end": "2005-08-09T18:31:42+07"
            },
            {
              "id": 3,
              "title": "Landscape VIII",
              "type": "open",
              "description": "A landscape doesn't have to be dramatic to be memorable. Meadows, fields, streams, rivers, lakes, oceans, mountains, deserts... we all have landscapes around us, and success comes from the light :-)",
              "ruleset": "extended",
              "extra_rules": "",
              "entries_count": 22,
              "user_votes_count": 0,
              "submission_start": "2005-08-09T18:31:42+07",
              "submission_end": "2019-09-09T18:31:42+07",
              "vote_start": "2005-08-09T18:31:42+07",
              "vote_end": "2005-08-09T18:31:42+07"
            }
          ]
        }
      }
    }
  },

  resolveImageUrl (relativePath) {
    return url + relativePath
  },

  ...api
}

/**
 * Creating a Vue.js plugin for backend api
 */

const apiPlugin = {
  install () {
    Vue.prototype.$api = $api
  }
}

Vue.use(apiPlugin)

export {
  $api
}
