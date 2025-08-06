#!/bin/bash

token='pathBADIOjtLtrliZ.79eb3cd8ca485b826778840b03b8a714c7e1b8dc18180bb5f95afb38aebf371d';
curl "https://api.airtable.com/v0/app9TUcYzYbLtSc81/Reference%20Links?maxRecords=3&view=Grid%20view" \
  -H "Authorization: Bearer ${token}"
