# Models

## classes
* user ( user details )
* land ( land details )

### user
* class
    + confirms the model is of user class
* id
    + id of the user ( and its public key )
* assets
    + array of ids of the land assets with the person

### land
* class
    + confirms the model is of land class
* id
    + id of the land ( function of latLong containing hash function )
* latLong
    + array of its latitude and longitude of its corners
* owner
    + present owner of the land
