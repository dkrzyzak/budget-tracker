/* eslint-disable no-restricted-syntax */
export function createResponse<AdditionalData = {}>(
    status: number,
    result: ActionResult<AdditionalData>
) {
    return new Response(JSON.stringify(result), { status });
}
