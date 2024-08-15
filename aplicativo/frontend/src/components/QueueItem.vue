<script setup lang="ts">
    const props = defineProps<{
        id: number,
        fname: string,
        lname: string,
        cpf: string,
        sus: string,
        phone?: string,
        priority: string,
        status: string,
        withdrawal?: Date,
        withdrawer?: string,
        procedure: Procedure
    }>();
</script>

<template>
    <tr>
        <td>{{fname}} {{lname}}</td>
        <td style="font-family: monospace">{{cpf}}</td>
        <td>{{procedure.attributes.name}}</td>
        <td class="text-center">
            <button type="button" class="btn btn-primary">
                <i class="bi bi-eye"></i>
            </button>
        </td>
    </tr>
</template>
