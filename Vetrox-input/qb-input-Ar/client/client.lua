opened = false
local Promise = nil

RegisterNUICallback('close', function()
    print("Discord: https://discord.gg/hZpJpAu3Zt")
    if Promise then
        Promise:resolve('closed')
        Promise = nil
    end
    SetNuiFocus(false, false)
    opened = false
end)

exports('ShowInput', function(info)
    print("Discord: https://discord.gg/hZpJpAu3Zt")
    if not info then return end
    Promise = promise.new()
    opened = true
    SetNuiFocus(true, true)
    SendNUIMessage({
        open = true,
        info = info,
    })

    local result = Citizen.Await(Promise)
    if result ~= 'closed' then
        return result
    else
        return nil
    end
end)

RegisterNUICallback('submit', function(data)
    print("Discord: https://discord.gg/hZpJpAu3Zt")
    Promise:resolve(data.tablo)
    Promise = nil
    SetNuiFocus(false, false)
    opened = false
end)