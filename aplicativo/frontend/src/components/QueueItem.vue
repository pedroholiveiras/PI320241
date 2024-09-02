<script setup lang="ts">
    const props = defineProps<{
        id: number,
        name: string,
        cpf: string,
        sus: string,
        phone?: string,
        priority?: number,
        status?: number,
        withdrawal?: Date,
        withdrawer?: string,
        procedure: Procedure
    }>();
</script>

<template>
    <tr>
        <td>{{name}}</td>
        <td style="font-family: monospace">{{cpf}}</td>
        <td>{{procedure.attributes.name}}</td>
        <td class="text-center">
            <button type="button" class="btn btn-primary">
                <i class="bi bi-eye"></i>
            </button>
        </td>
    </tr>
</template>
