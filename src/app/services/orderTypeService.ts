
export default class OrderType {
    public static types(){
        return {
            Current_Owner_Search: 'Current Owner Search',
            Current_Owner_Search_Plus: 'Current Owner Search Plus',
            Two_Owner_Search: 'Two Owner Search',
            Two_Owner_Search_Plus: 'Two Owner Search Plus',
            Full_Search: 'Full Search',
            Full_Search_Plus: 'Full Search Plus',
            Update: 'Update',
            Commitment_Typing: 'Commitment Typing',
            DocumentRetrieval: 'Document Retrieval',
            Search_30_years: '30 years Search',
            Search_Plus_30_years: '30 years Search Plus '
          };
    }
    public static productDescription(){
        return{
            Current_Owner_Search: 'Current owner rundown forward from and including current vesting document with all supporting documentation.',
            Current_Owner_Search_Plus: 'Current owner rundown forward from and including current vesting document with all supporting documentation.',
            Two_Owner_Search: "Two owner rundown forward from and including current vesting document and all deeds leading back to prior owner's vesting document, with all supporting documentation.", 
            Two_Owner_Search_Plus: "Two owner rundown forward from and including current vesting document and all deeds leading back to prior owner's vesting document, with all supporting documentation.",
            Full_Search: 'Full search including current vesting document and deed chain with all supporting documentation. The search period is based upon state standards and customs. Includes entry of chain of title, legal description, requirements, and exceptions.',
            Full_Search_Plus: 'Full search including current vesting document and deed chain with all supporting documentation. The search period is based upon state standards and customs. Includes entry of chain of title, legal description, requirements, and exceptions.',
            Update: 'Performed starting from the completion of the previous title search to lookfor documents recorded in the gap period. Typically performed prior to a closing, but can be ordered at anytime as needed.',
            Commitment_Typing: 'Keying of Deed, Tax, Mortgage, Legal and Judgement information into client system based on search package provided to generate Commitment or Property Report.',
            DocumentRetrieval: 'Obtain and deliver the requested documents.',
            Search_30_years: 'All deeds transfer in chain of title of all owners within the last thirty (30) years or more. Includes entry of chain of title, legal description, requirements, and exceptions.',
            Search_Plus_30_years: 'All deeds transfer in chain of title of all owners within the last thirty (30) years or more. Includes entry of chain of title, legal description, requirements, and exceptions. ' 
        };
    }
}