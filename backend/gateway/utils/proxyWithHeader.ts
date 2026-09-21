import proxy from 'express-http-proxy'

export const proxyWithHeader = (serviceUrl: string | undefined) => {
    if (!serviceUrl) {
        throw new Error("Service URL is undefined. Check your environment variables.");
    }
    return proxy(serviceUrl, {
        proxyReqOptDecorator: (proxyReqOpts: any, srcReq: any) => {
            if (srcReq.user) {
                proxyReqOpts.headers['x-user-id'] = srcReq.user.userId
            }
            return proxyReqOpts
        }
    })
}