# Land Functions 

## Landfunc
This function provides the user a landId by taking the hash of the json 
Object in which the coordinates of the land are provided.We have  used geojson npm library which helps in storing the coordinates of a polygon. 

For this you need to run : npm install geojson

## Landcomp
This function helps in telling a given land is a subset of another land or not . For this we have used npm library : robust-point-in-polygon .

For this you need to run :npm install robust-point-in-polygon.

## Landmerge
This function helps in telling whether two given land can be merged or not on the basis of the coordinates provided.
