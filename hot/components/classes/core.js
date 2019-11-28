/* Core file for non class specific items (eg. shared/global variables) */

export const BASE_URL = 'https://hot-backend.herokuapp.com'

export const fetch_headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

var temp = {
  "markers": ["#ffe6b5","#fcd8a4","#fca4a4"],
  "tags": ["#fad387","#fad387","#fad387"]
}

var vibrant = {
  "markers": ["#d4e6ff","#da61ff","#ff9eb5"],
  "tags": ["#66b8ff","#e8cafc","#fccadf"]
}

export var theme = vibrant
export var globVars = {
  user: null,
  points_to_boost : 0,
  hot_colors: theme["markers"],
  tag_colors: theme["tags"],
  marker_colors: [[0, 157, 255], [156, 0, 204], [255, 0, 98]]
}