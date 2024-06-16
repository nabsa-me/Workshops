export const requestTemplate = `
#set( $ssmRequestBody = 
    {
    "Path":  "/systems/$context.args.systemName",
    "Recursive" : true
    }
)
{
    "version": "2018-05-29",
    "method": "POST",
    "resourcePath": "/",
    "params":{
        "headers": {
            "X-Amz-Target" : "AmazonSSM.GetParametersByPath",
            "Content-Type" :     "application/x-amz-json-1.1"
        },
        "body" : $util.toJson($ssmRequestBody)
    }
}` as string

export const responseTemplate = `
      #if($ctx.error)
    $util.error($ctx.error.message, $ctx.error.type)
#end
#if($ctx.result.statusCode == 200)
    #set( $body = $util.parseJson($ctx.result.body) )
    #set($arrayOfParameters = [])
    #foreach( $item in $body.Parameters )
        $util.qr( $arrayOfParameters.add( { "Name" : $item.Name, "Value" : $item.Value } ) )
    #end
    $util.toJson( { "SystemName" : $ctx.arguments.systemName , "Parameters" : $arrayOfParameters }  )
#else
    $util.toJson($ctx.error)
    $utils.appendError($ctx.result.body, "$ctx.result.statusCode")
#end` as string
