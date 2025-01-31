RegisterCommand('testinput_Vetrox2', function()
    local dialog = exports['qb-input']:ShowInput({
        header = "Burger Shot Purchase List",
        submitText = "Payment",
        inputs = {
            {
                text = "Player ID",
                name = "id",
                type = "number",
                isRequired = true,
            },
            {
                text = "Password",
                name = "code",
                type = "password",
                isRequired = true,
            },
            {
                text = "Payment Type",
                name = "billtype",
                type = "radio",
                options = {
                    { text = "Cash", value = "cash" },
                    { text = "Bank", value = "Bank" }
                },
            },
        },        
    })

    if dialog ~= nil then
        for k,v in pairs(dialog) do
            print(k .. " : " .. v)
        end
    end
end, false)

for test
/testinput_Vetrox2