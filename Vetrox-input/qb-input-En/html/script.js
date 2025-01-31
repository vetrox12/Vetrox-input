addEventListener('message', function (event) {
    var poy = event.data;
    if (poy.open == true) {
        SetupItems(poy.info);
        $('.maincon').fadeIn();
        $('.Exit').fadeIn();
        $('.VetroxInformations').fadeIn();
    }
});

document.onkeydown = function (data) {
    if (data.which == 27) {
        $('.maincon').fadeOut();
        $('.Exit').fadeOut();
        $('.VetroxInformations').fadeOut();
        $.post(`https://${GetParentResourceName()}/close`);
    }
};

$(document).on('click', '.submit', function () {
    let cb = CheckIfRequired();

    if (cb) {
        let tablo = {};
        let inputs = document.getElementsByClassName('optionInput');
        
        for (let i = 0; i < inputs.length; i++) {
            let val = $(inputs[i]).val();
            let name = $(inputs[i]).attr('id');
            if (name) {
                tablo[name] = val;
            }
        }
        $('.button-group').each(function () {
            let name = $(this).find('.option-button').first().attr('data-name');
            let val = $(this).find('.option-button.selected').attr('data-value');
        
            if (name && val) { 
                tablo[name] = val;
            }
        });
        $.post(`https://${GetParentResourceName()}/submit`, JSON.stringify({ tablo: tablo }));
        $('.maincon').fadeOut();
        $('.Exit').fadeOut();
        $('.VetroxInformations').fadeOut();
    }
});

function CheckIfRequired() {
    let cango = true;
    let inputs = document.getElementsByClassName('optionInput');
    
    for (let pimps = 0; pimps < inputs.length; pimps++) {
        let req = $(inputs[pimps]).parent().attr('data-required');

        if (req == 'true' && $(inputs[pimps]).val() == '') {
            cango = false;
        }
    }

    let radioGroups = document.querySelectorAll('.button-group');
    radioGroups.forEach((group) => {
        let required = group.closest('.newOption').getAttribute('data-required') === 'true';
        let selected = group.querySelector('.option-button.selected');

        if (required && !selected) {
            cango = false;
        }
    });

    return cango;
}

function SetupItems(info) {
    $('.appendablediv').html('');
    document.getElementById('Logo').src = "./logo.png";
    $(".TextTitle").html(info.header || "Title");

    $.each(info.inputs, function (index, output) {
        if (output.isRequired === undefined) {
            output.isRequired = false;
        }

        let inputHTML = '';

        if (output.type === 'input' || output.type === 'text') {
            inputHTML = `
                <div class="newOption" data-optid="${index}" data-required="${output.isRequired}">
                    <span class="optionDesc">${output.text}</span>
                    <input type="text" class="optionInput" id="${output.name}">
                </div>`;
        } else if (output.type === 'number') {
            inputHTML = `
            <div class="newOption" data-optid="${index}" data-required="${output.isRequired}">
                   <span class="optionDesc">${output.text}</span>
                    <input type="text" class="optionInput numberOnly" id="${output.name}">
            </div>`;
        } else if (output.type === 'password') {
            inputHTML = `
                <div class="newOption" data-optid="${index}" data-required="${output.isRequired}">
                    <span class="optionDesc">${output.text}</span>
                    <input type="password" class="optionInput" id="${output.name}">
                </div>`;
        } else if (output.type === 'radio') {
            inputHTML = `
                <div class="newOption" data-optid="${index}" data-required="${output.isRequired}">
                    <span class="optionDesc">${output.text}</span>
                    <div class="button-group" data-name="radio_${index}">`;
            output.options.forEach((option, i) => {
                inputHTML += `
                    <button type="button" class="option-button ${output.default == option.value ? 'selected' : ''}" 
                        data-value="${option.value}" 
                        data-name="${output.name}">
                        ${option.text}
                    </button>`;
            });

            inputHTML += `</div>
                          <input type="hidden" id="${output.name}" value="${output.default ? output.default : output.options[0].value}">
                          </div>`;
        }

        $('.appendablediv').append(inputHTML);
    });

    $(document).on("click", ".option-button", function () {
        let parent = $(this).closest(".button-group");
        parent.find(".option-button").removeClass("selected");
        $(this).addClass("selected");
        let selectedValue = $(this).attr("data-value");
        let inputName = $(this).attr("data-name");
        $(`#${inputName}`).val(selectedValue).change();
    });

    if (info.submitText) {
        $('.submit').text(info.submitText);
    } else {
        $('.submit').text("submit");
    }

    $('.numberOnly').on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
}